# Generated by Django 3.1.5 on 2021-04-25 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fball_calculator', '0005_auto_20210414_2230'),
    ]

    operations = [
        migrations.CreateModel(
            name='AvrComp',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Pos', models.CharField(max_length=1)),
                ('FGM', models.FloatField()),
                ('FGA', models.FloatField()),
                ('FG_PCT', models.FloatField()),
                ('FG3M', models.FloatField()),
                ('FTM', models.FloatField()),
                ('FTA', models.FloatField()),
                ('FT_PCT', models.FloatField()),
                ('REB', models.FloatField()),
                ('AST', models.FloatField()),
                ('STL', models.FloatField()),
                ('BLK', models.FloatField()),
                ('TOV', models.FloatField()),
                ('PTS', models.FloatField()),
            ],
        ),
    ]
