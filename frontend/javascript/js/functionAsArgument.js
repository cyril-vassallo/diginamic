//First class citizen  passage en argument d'une function

function test(f)  {
  console.log(f);
  f();
};

test(
  ()=> {console.log(("test"))}
)