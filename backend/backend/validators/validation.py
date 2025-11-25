import phonenumbers


def is_valid_phone_number(value: str) -> bool:
    try:
        phone = phonenumbers.parse(value, "RU")
        return phonenumbers.is_valid_number(phone)
    except phonenumbers.NumberParseException:
        return False
