import axios from "axios";

axios.get("http://localhost:3000", {
    data: {
        name: "dawdad"
    }
}).then((res) => console.log(res)
)