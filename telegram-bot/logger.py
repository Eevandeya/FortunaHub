import logging
import sys

from decouple import config

LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"


def get_logger(name: str = "app") -> logging.Logger:
    logger = logging.getLogger(name)

    if config("DEBUG", cast=bool):
        logger.setLevel(logging.DEBUG)
    else:
        logger.setLevel(logging.INFO)

    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(logging.Formatter(LOG_FORMAT))
    logger.addHandler(console_handler)

    # Logging to file:
    #
    # file_handler = logging.FileHandler("app.log")
    # file_handler.setFormatter(logging.Formatter(LOG_FORMAT))
    # logger.addHandler(file_handler)
    #

    return logger
