set term qt persist
#set yrange [0:10000]
set xrange [1000:65000]
set key b
plot 'data_rendement_27000_12_all.csv' u 1:8
#plot 'data_rendement_27000_12_all.csv' u 1:2, 'data_rendement_27000_12_all.csv' u 1:3, 'data_rendement_27000_12_all.csv' u 1:4
#plot 'data_rendement_27000_43.csv' u 1:5, 'data_rendement_27000_43.csv' u 1:6, 'data_rendement_27000_43.csv' u 1:7
#splot 'data_rendement_27000_43.csv' u 3:4:1
#pause -1