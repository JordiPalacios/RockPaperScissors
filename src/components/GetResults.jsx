import { Combinations } from "./combinations";

export const GetResult = (userChoice, pcChoice) => {
    if (userChoice === pcChoice) {
      return 0;
    }
  
    if (Combinations[userChoice].beats.includes(pcChoice)) {
      return 1;
    }
  
    else {
      return 2;
    }
  
  }