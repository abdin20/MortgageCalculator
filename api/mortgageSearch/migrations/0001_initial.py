# Generated by Django 4.0.3 on 2022-03-20 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MortgageSearch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('source', models.CharField(default='', max_length=60)),
                ('year', models.IntegerField()),
                ('down_payment_level', models.CharField(default='', max_length=60)),
                ('first_mortgage', models.BooleanField(default=False)),
                ('long_amortization', models.BooleanField(default=False)),
                ('rate_type', models.CharField(default='', max_length=60)),
                ('rate', models.CharField(default='', max_length=60)),
                ('posted', models.BooleanField(default=False)),
                ('refinance_rate', models.DecimalField(decimal_places=2, default=0.0, max_digits=10)),
                ('type', models.CharField(default='', max_length=60)),
            ],
        ),
    ]
