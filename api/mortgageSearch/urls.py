from django.urls import include, re_path
from mortgageSearch import views 
 
urlpatterns = [ 
    re_path(r'^api/mortgageSearch/all', views.mortgageSearch_list),
    re_path(r'^api/mortgageSearch/typeSearch/(?P<mortgageType>\w{0,50})',views.mortgageSearch_type),
    re_path(r'^api/mortgageSearch/rateSearch/(?P<mortgageType>\w{0,50})(?P<mortgageLength>\w{0,50})(?P<downPayment>\w{0,50})',views.mortgageSearch_rates)
]
