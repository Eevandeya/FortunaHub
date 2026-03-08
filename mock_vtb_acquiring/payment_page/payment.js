async function setPaymentStatus(status) {
    const statusMessage = document.getElementById("status-message");
    const buttons = document.querySelectorAll(".payment-btn");
    const overlay = document.getElementById("payment-overlay");
    const countdownValue = document.getElementById("countdown-value");

    if (!orderId) {
        statusMessage.textContent = "Error: order_id not found.";
        return;
    }

    buttons.forEach(button => {
        button.disabled = true;
    });

    statusMessage.textContent = "Send request...";

    try {
        const response = await fetch(
            `http://127.0.0.1:8088/set-payment-status/?mdOrder=${encodeURIComponent(orderId)}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: status })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json().catch(() => null);
        console.log("Ответ сервера:", data);

        if (status === "paid") {
            statusMessage.textContent = "Status has changed: paid";
        } else if (status === "failed") {
            statusMessage.textContent = "Status has changed: failed";
        } else {
            statusMessage.textContent = "Status has changed: pending";
        }

        overlay.classList.remove("hidden");

        let seconds = 3;
        countdownValue.textContent = seconds;

        const timer = setInterval(() => {
            seconds -= 1;
            countdownValue.textContent = seconds;

            if (seconds <= 0) {
                clearInterval(timer);
                window.location.href = redirectUrl;
            }
        }, 1000);

    } catch (error) {
        console.error(error);
        statusMessage.textContent = `Error sending request: ${error.message}`;

        buttons.forEach(button => {
            button.disabled = false;
        });
    }
}
