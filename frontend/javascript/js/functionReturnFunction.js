/**
 * Renvoie d'un function par une function
 */
(function() {
  const helloLast  = lastName => msg + "(nom de famille : "  + lastName + ")";
  const helloFirst = firstName => {
  msg = "Hello " + firstName;
  return helloLast;
  }
  console.log(helloFirst("BOB")("Dylan"));
})();

