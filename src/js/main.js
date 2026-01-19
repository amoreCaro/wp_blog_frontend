import { estimateSinglePostReadTime } from "./components/estimateSinglePostReadTime.js";
import { calculateTotalPages} from "./components/calculateTotalPages.js";

document.addEventListener('DOMContentLoaded', function() {
  console.log("Main js loaded")
  calculateTotalPages();
  estimateSinglePostReadTime();
});