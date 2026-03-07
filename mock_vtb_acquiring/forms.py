# ruff: noqa: N803, B008

from fastapi import Form
from pydantic import BaseModel


class PaymentData:
    def __init__(
        self,
        amount: int = Form(...),
        currency: str = Form(...),
        orderNumber: str = Form(...),
        userName: str = Form(...),
        password: str = Form(...),
        returnUrl: str = Form(...),
    ) -> None:
        self.amount = amount
        self.currency = currency
        self.userName = userName
        self.password = password
        self.returnUrl = returnUrl
        self.orderNumber = orderNumber


class PaymentStatus(BaseModel):
    status: str
