from decimal import *
from django.db.models import Func

class TwoDecimals(Func):
    function = 'ROUND'
    template='%(function)s(%(expressions)s, 2)'