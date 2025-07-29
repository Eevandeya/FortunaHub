import datetime

from backend.apps.customers.models import Customer


def handle_customer_visit(validated_customer_data: dict, visit_date: datetime.date) -> Customer:
    customer, created = Customer.objects.get_or_create(
        phone_number=validated_customer_data["phone_number"],
        defaults={
            "nickname": validated_customer_data.get("nickname", ""),
            "last_visit_date": visit_date,
            "number_of_visits": 1
        }
    )

    if not created:
        customer = Customer.objects.get(phone_number=validated_customer_data["phone_number"])
        customer.nickname = validated_customer_data.get("nickname", customer.nickname)
        customer.number_of_visits += 1
        customer.last_visit_date = visit_date
        customer.save()

    return customer
