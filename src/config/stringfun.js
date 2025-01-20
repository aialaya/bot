export  const formatString = (str,num) => {
    if (str.length <= num) {
        return str;
    }
    return `${str.substring(0, num/2)}...${str.substring(str.length - num/2)}`;
};