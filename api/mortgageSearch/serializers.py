from rest_framework import serializers 
from mortgageSearch.models import MortgageSearch
 
 
class MortgageSearchSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = MortgageSearch
        fields = (
                  'source',
                  'year',
                  'down_payment_level',
                  "first_mortgage",
                  "long_amortization",
                  "rate_type",
                  "rate",
                  "posted",
                  "refinance_rate",
                  "type")
