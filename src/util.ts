export default {
  arrayToHex(array: any) {
    return Array.from(array, (byte: any) => {
      return ('0' + (byte & 0xff).toString(16)).slice(-2);
    }).join('');
  },
}
