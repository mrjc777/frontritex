export const localizationobj:any = {};
localizationobj.percentsymbol= "%";
localizationobj.currencysymbol= "$";
localizationobj.currencysymbolposition= "anterior";
localizationobj.decimalseparator= ".";
localizationobj.thousandsseparator= ",";
localizationobj.pagergotopagestring= "Ir a pag=";
localizationobj.pagershowrowsstring= "Mostrar filas=";
localizationobj.pagerrangestring= " de ";
localizationobj.pagerpreviousbuttonstring= "previo";
localizationobj.pagernextbuttonstring= "siguiente";
localizationobj.groupsheaderstring= "Arrastre una columna para que se agrupe por ella";
localizationobj.sortascendingstring= "Ordenar Acs";
localizationobj.sortdescendingstring= "Ordenar Des";
localizationobj.sortremovestring= "Quitar orden";
localizationobj.groupbystring= "Agrupar por esta columna";
localizationobj.groupremovestring= "Quitar de grupos";
localizationobj.filterclearstring= "Limpiar";
localizationobj.filterstring= "Filtro";
localizationobj.filtershowrowstring= "Mostrar filas donde=";
localizationobj.filtershowrowdatestring= "Mostrar filas donde fecha=";
localizationobj.filterorconditionstring= "O";
localizationobj.filterandconditionstring= "Y";
localizationobj.filterselectallstring= "(Seleccionar Todo)";
localizationobj.filterchoosestring= "Por favor seleccione:";
localizationobj.filterstringcomparisonoperators= ["vacio", "no vacio", "contenga", "contenga(coicidir Mayusculas/Minusculas)",
"no contenga", "no contenga(coincidir Mayusculas/Minusculas)", "inicia con", "inicia con(coicidir Mayusculas/Minusculas)",
"termina con", "termina con(coicidir Mayusculas/Minusculas)", "igual", "igual(coicidir Mayusculas/Minusculas)", "null", "no null"];
localizationobj.filternumericcomparisonoperators= ["=", "!=", "<", "<=", ">", ">=", "null", "no null"];
localizationobj.filterdatecomparisonoperators= ["=", "!=", "<", "<=", ">", ">=", "null", "no null"];
localizationobj.filterbooleancomparisonoperators= ["=", "!="];
localizationobj.validationstring= "Valor no valido";
localizationobj.emptydatastring= "No hay registros que mostrar";
localizationobj.filterselectstring= "Seleccione un Filtro";
localizationobj.loadtext= "Cargando…";
localizationobj.clearstring= "Limpiar";
localizationobj.todaystring= "hoy";

var days = {
// full day names
names: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
// abbreviated day names
namesAbbr: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
// shortest day names
namesShort: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"]
};
localizationobj.days = days;
var months = {
// full month names (13 months for lunar calendards — 13th month should be "" if not lunar)
names: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Augosto", "Septiembre", "Octubre", "Noviembre", "Diciembre", ""],
// abbreviated month names
namesAbbr: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic", ""]
};
localizationobj.months = months;