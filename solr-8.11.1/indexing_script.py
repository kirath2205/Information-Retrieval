from audioop import add
from operator import sub
import os

directory='Scrapping/'

file_list=[]
for folder,subfolder,file_list in os.walk(directory):
    for element in file_list:
        if('.csv' in element):
            address=folder+'/'+element
            os.system('bin/post -c CSVCore '+address)
        


