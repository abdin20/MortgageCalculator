from django.db import models

class MortgageSearch(models.Model):
    source = models.CharField(max_length=60,blank=False, default='')
    year = models.IntegerField()
    down_payment_level=models.CharField(max_length=60,blank=False, default='')
    first_mortgage = models.BooleanField(default=False)
    long_amortization=models.BooleanField(default=False)
    rate_type=models.CharField(max_length=60,blank=False, default='')
    rate=models.CharField(max_length=60,blank=False, default='')
    posted=models.BooleanField(default=False)
    refinance_rate=models.DecimalField(decimal_places=2,max_digits=10, default=0.00)
    type=models.CharField(max_length=60,blank=False, default='')
