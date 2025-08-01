import datetime

from backend.apps.customers.models import Customer


def handle_customer_visit(
    nickname: str, phone_number: str, visit_date: datetime.date
) -> Customer:
    customer, created = Customer.objects.get_or_create(
        phone_number=phone_number,
        defaults={
            "nickname": nickname,
            "last_visit_date": visit_date,
            "number_of_visits": 1,
        },
    )

    if not created:
        customer.nickname = nickname
        customer.number_of_visits += 1
        customer.last_visit_date = visit_date
        customer.save()

    return customer
