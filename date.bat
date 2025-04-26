
set yyyy=%date:~0,4%
set mm=%date:~5,2%
set dd=%date:~8,2%
set hh=%time:~0,2%
set minute=%time:~3,2%


echo %yyyy%
echo %mm%
echo %dd%
echo %hh%
echo %minute%
echo %ss%

set yyyymmddhhmmss=%date:~0,4%%date:~5,2%%date:~8,2%%time:~0,2%%time:~3,2%%time:~6,2%



if %hh% geq 0  if %hh% leq 8 (
    echo "2 c"
) else (
    echo "not hit"
)

if %hh% geq 8  if %hh% leq 16 (
    echo "3 c"
) else (
    echo "not hit"
)

if %hh% geq 16  if %hh% leq 24 (
    echo "1 c"
    set stahh = 9
    set stohh = 17
) else (
    echo "not hit"
)




pause



test_calender.exe %yyyy% %mm% %dd% %hh% %minute%



