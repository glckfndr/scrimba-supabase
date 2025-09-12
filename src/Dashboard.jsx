import supabase from "./supabase-client.js";
import { useEffect } from "react";

function Dashboard() {
  /**
	Challenge:
* 1) Import the supabase client.
* 2) Wrap the Supabase client code in a 'fetchMetrics' asynchronous function.
* 3) Import useEffect and add this hook at the top of the Dashboard component.
* 4) Call the 'fetchMetrics' function as the effect in this hook and have it run
		 only once after inital render.
* 5) Log the response to the console and save (Cmd/Ctrl + s).
     Hint: What makes useEffect only run on 1st render? Google is your friend.
*/
  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    const { data, error } = await supabase
      .from("sales_deals")
      .select(
        `
	    name,
	    value
	    `
      )
      .order("value", { ascending: false })
      .limit(3);
    console.log(data, error);
  }

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
      </div>
    </div>
  );
}

export default Dashboard;
