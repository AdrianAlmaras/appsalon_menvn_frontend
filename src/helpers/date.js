import { parse, formatISO, parseISO, format } from 'date-fns';
import es from 'date-fns/locale/es';

// convertimos la fecha en formato iso
export function convertToISO(strDate) {
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date()); 
    //console.log(formatISO(newDate)); // formato iso
    return formatISO(newDate);
}
// formatear fecha tipo ISO - viernes, 18 de julio de 2025
export function displayDate(date) {
    //console.log(date);
    const newDate = parseISO(date);
    const formattedDate = format(newDate, 'PPPP', {locale: es});
    return formattedDate
}

// formatear ISO a string
export function convertToDDMMYYYY(isoDate) {
    const newDate = new Date(isoDate);
    const formattedDate = format(newDate, 'dd/MM/yyyy');
    return formattedDate
}



