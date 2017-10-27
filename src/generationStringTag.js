function argParser(arg) {
  return {
    list: arg,
    combinations: arg.length,
  };
}

export default function tag(stringParts, ...args) {
  const parsedArgs = args.map(argParser);
  const combinations = parsedArgs.reduce((prev, item) => prev * item.combinations, 1)
  return {
    stringParts,
    args: parsedArgs,
    combinations
  };
} 