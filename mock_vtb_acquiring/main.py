# ruff: noqa: N803, B008

from uuid import UUID, uuid4

from database import PaymentDB
from fastapi import Body, Depends, FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from forms import PaymentData, PaymentStatus
from uvicorn import run as uvicorn_run

app = FastAPI()
db = PaymentDB()

templates = Jinja2Templates(directory="payment_page")
app.mount("/static", StaticFiles(directory="payment_page"), name="static")


PENDING = "pending"
PAID = "paid"
FAILED = "failed"


@app.post("/payment/rest/register.do")
def register(payment_data: PaymentData = Depends()) -> JSONResponse:
    order_id = str(uuid4())
    order_data = {**payment_data.__dict__, "payment_status": PENDING}
    db.save_order(order_id, **order_data)
    return JSONResponse(
        content={
            "orderId": order_id,
            "formUrl": f"http://127.0.0.1:8088/payment/merchants/payment_en.html?mdOrder={order_id}",
        }
    )


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
def set_payment_status(mdOrder: UUID, data: PaymentStatus = Body(...)) -> JSONResponse:
    order_id = str(mdOrder)
    order_data = db.get_order(order_id)
    if not order_data:
        raise HTTPException(status_code=404, detail="Order not found")
    if data.status not in [PENDING, PAID, FAILED]:
        return {"error": "invalid status"}
    order_data["payment_status"] = data.status
    db.save_order(order_id, **order_data)
    return JSONResponse(
        content={
            "orderId": order_id,
            "status": data.status,
        }
    )


if __name__ == "__main__":
    try:
        uvicorn_run(app, host="127.0.0.1", port=8088)
    except Exception as err:
        raise err
    finally:
        db.commit()
