iSatu = 0
iDua = 0
iTiga = 0
iEmpat = 0
iLima = 0

for iSatu in range(11):
    if (iSatu % 4) == 0:
        iDua = iDua + iSatu + iTiga - iLima
    if (iSatu % 3) == 0:
        iTiga = iTiga + (iSatu + iDua) - iEmpat
    if (iSatu % 2) == 0:
        iEmpat = iEmpat + (iSatu + iDua) - iTiga
    if (iSatu % 1) == 0:
        iLima = iSatu + iDua + iTiga

print("iSatu:", iSatu)
print("iDua:", iDua)
print("iTiga:", iTiga)
print("iEmpat:", iEmpat)
print("iLima:", iLima)
