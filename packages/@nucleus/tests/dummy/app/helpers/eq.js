import { helper } from "@ember/component/helper";

function eq(args) {
  return (args[0] === args[1])
}

export default helper(eq);