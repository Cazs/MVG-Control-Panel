export const formatDate = (date) => date.getFullYear() + '-'
                              + (date.getMonth()>=10 ? date.getMonth() : '0' + date.getMonth()) + '-'
                              + (date.getDate()>=10 ? date.getDate() : '0' + date.getDate());
