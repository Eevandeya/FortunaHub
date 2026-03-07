from pprint import pprint

from requests import Response, post


def register_order() -> Response:
    return post(
        "http://127.0.0.1:8088/payment/rest/register.do",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={
            "amount": "20000",
            "currency": "643",
            "userName": "username",
            "password": "password",
            "returnUrl": "http://127.0.0.1:8080/bookings/booking-info?orderNumber=AFD312-032",
            "orderNumber": "AFD312-032",
        },
    )


def check_order(order_id: str) -> Response:
    return post(
        "http://127.0.0.1:8088/payment/rest/getOrderStatusExtended.do",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
        data={"userName": "username", "password": "password", "orderId": order_id},
    )


if __name__ == "__main__":
    reg_resp = register_order().json()
    order_id_ = reg_resp["orderId"]
    pprint(reg_resp)

    print()

    check_resp = check_order(order_id_).json()
    pprint(check_resp)
