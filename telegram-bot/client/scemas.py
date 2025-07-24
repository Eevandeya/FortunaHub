from datetime import date, time

from pydantic import BaseModel


class TimeSlot(BaseModel):
    start: time
    end: time


class FreeSlotsResponse(BaseModel):
    date: date
    free_slots: list[TimeSlot]
