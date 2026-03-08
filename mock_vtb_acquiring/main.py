# ruff: noqa: N803, B008
from random import randint
from time import time_ns
from uuid import UUID, uuid4

from database import PaymentDB
from fastapi import Body, Depends, FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from forms import PaymentDataForm, PaymentStatus, PaymentStatusForm
from uvicorn import run as uvicorn_run

app = FastAPI()
db = PaymentDB()

templates = Jinja2Templates(directory="payment_page")
app.mount("/static", StaticFiles(directory="payment_page"), name="static")


PENDING = "pending"
PAID = "paid"
FAILED = "failed"


@app.post("/payment/rest/register.do")
def register(payment_data: PaymentDataForm = Depends()) -> dict:
    order_id = str(uuid4())
    order_data = {
        **payment_data.__dict__,
        "payment_status": PENDING,
        "date": time_ns() // 1_000_000,
        "ip": ".".join(str(randint(0, 255)) for _ in range(4)),
    }
    db.save_order(order_id, **order_data)
    return {
        "orderId": order_id,
        "formUrl": f"http://127.0.0.1:8088/payment/merchants/payment_en.html?mdOrder={order_id}",
    }


@app.get("/payment/merchants/payment_en.html")
def payment_en(request: Request, mdOrder: UUID) -> HTMLResponse:
    order_id = str(mdOrder)
    order_data = db.get_order(order_id)
    return templates.TemplateResponse(
        "payment.html",
        {
            "request": request,
            "order_id": order_id,
            "booking_amount": f"{int(order_data['amount']) / 100:.2f}",
            "redirect_url": order_data["returnUrl"],
        },
    )


@app.patch("/set-payment-status/")
def set_payment_status(mdOrder: UUID, data: PaymentStatus = Body(...)) -> dict:
    order_id = str(mdOrder)
    order_data = db.get_order(order_id)
    if not order_data:
        raise HTTPException(status_code=404, detail="Order not found")
    if data.status not in [PENDING, PAID, FAILED]:
        return {"error": "invalid status"}
    order_data["payment_status"] = data.status
    db.save_order(order_id, **order_data)
    return {
        "orderId": order_id,
        "status": data.status,
    }


@app.post("/payment/rest/getOrderStatusExtended.do")
def get_order_status_extended(
    payment_status_data: PaymentStatusForm = Depends(),
) -> dict:
    order_data = db.get_order(payment_status_data.orderId)
    if not order_data:
        raise HTTPException(status_code=404, detail="Order not found")

    if order_data["payment_status"] == PAID:
        ordered_status = 2
        action_code = 0
        action_code_description = ""
        error_code = ""
        error_message = "Success"
    elif order_data["payment_status"] == PENDING:
        ordered_status = 0
        action_code = -100
        action_code_description = "Waiting for payment"
        error_code = "12"
        error_message = "waiting for payment"
    else:
        ordered_status = 3
        action_code = 20
        action_code_description = "Not enough funds on the card."
        error_code = "12"
        error_message = "No money"

    return {
        "orderNumber": order_data["orderNumber"],
        "ordered_status": ordered_status,
        "date": order_data["date"],
        "ip": order_data["ip"],
        "paymentWay": "CARD",
        "action_code": action_code,
        "action_code_description": action_code_description,
        "error_code": error_code,
        "error_message": error_message,
        "amount": order_data["amount"],
        "currency": order_data["currency"],
    }


if __name__ == "__main__":
    try:
        uvicorn_run(app, host="127.0.0.1", port=8088)
    except Exception as err:
        raise err
    finally:
        db.commit()
