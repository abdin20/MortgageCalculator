from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status
 
from mortgageSearch.models import MortgageSearch
from mortgageSearch.serializers import MortgageSearchSerializer
from rest_framework.decorators import api_view

@api_view(['GET', 'POST', 'DELETE'])
def mortgageSearch_list(request):
    # GET list of tutorials, POST a new tutorial, DELETE all tutorials
    if request.method == 'GET':
        mortgages = MortgageSearch.objects.all()
        
        mortgages_serailzer = MortgageSearchSerializer(mortgages, many=True)
        return JsonResponse(mortgages_serailzer.data, safe=False)
        # 'safe=False' for objects serialization
 
@api_view(['GET'])
def mortgageSearch_type(request,mortgageType):

    if request.method == 'GET':
        mortgageType=request.GET.get('mortgageType', '')
        mortgages = MortgageSearch.objects.filter(type=mortgageType).values('year').distinct().order_by("year")
        
        # title = request.GET.get('title', None)
        # if title is not None:
        #     tutorials = tutorials.filter(title__icontains=title)
        
        mortgages_serailzer = MortgageSearchSerializer(mortgages, many=True)
        return JsonResponse(mortgages_serailzer.data, safe=False)
        # 'safe=False' for objects serialization

def mortgageSearch_rates(request,mortgageType,mortgageLength,downPayment):
    if request.method == 'GET':
        mortgageType=request.GET.get('mortgageType', '')
        mortgageLength=request.GET.get('mortgageLength', '')
        downPayment=int(request.GET.get('downPayment', ''))

        if downPayment>=20:
            downPayment='2'
        else:
            downPayment='1'

        mortgages = MortgageSearch.objects.filter(type=mortgageType, year=mortgageLength).order_by('rate')
        
        mortgages_serailzer = MortgageSearchSerializer(mortgages, many=True)
        return JsonResponse(mortgages_serailzer.data, safe=False)
        # 'safe=False' for objects serialization