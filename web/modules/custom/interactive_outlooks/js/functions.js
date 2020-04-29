// Set the lead dropdown options
function formatLeadDates(x) {
  let leadLabel;
  switch (x.substring(0, 3)) {
    case 'JFM':
      leadLabel = 'Jan-Feb-Mar ' + x.substring(x.length - 4, x.length);
      break;
    case 'FMA':
      leadLabel = 'Feb-Mar-Apr ' + x.substring(x.length - 4, x.length);
      break;
    case 'MAM':
      leadLabel = 'Mar-Apr-May ' + x.substring(x.length - 4, x.length);
      break;
    case 'AMJ':
      leadLabel = 'Apr-May-Jun ' + x.substring(x.length - 4, x.length);
      break;
    case 'MJJ':
      leadLabel = 'May-Jun-Jul ' + x.substring(x.length - 4, x.length);
      break;
    case 'JJA':
      leadLabel = 'Jun-Jul-Aug ' + x.substring(x.length - 4, x.length);
      break;
    case 'JAS':
      leadLabel = 'Jul-Aug-Sep ' + x.substring(x.length - 4, x.length);
      break;
    case 'ASO':
      leadLabel = 'Aug-Sep-Oct ' + x.substring(x.length - 4, x.length);
      break;
    case 'SON':
      leadLabel = 'Sep-Oct-Nov ' + x.substring(x.length - 4, x.length);
      break;
    case 'OND':
      leadLabel = 'Oct-Nov-Dec ' + x.substring(x.length - 4, x.length);
      break;
    case 'NDJ':
      leadLabel = 'Nov-Dec-Jan ' + x.substring(x.length - 9, x.length);
      break;
    case 'DJF':
      leadLabel = 'Dec-Jan-Feb ' + x.substring(x.length - 9, x.length);
      break;
    default:
      leadLabel = x;
  }
  return x;
}