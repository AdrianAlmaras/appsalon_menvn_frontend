import api from "@/lib/axios";
import { all } from "axios";

export default {
    all() {
        return api.get('/services')
    }
}


