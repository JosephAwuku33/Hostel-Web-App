import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        default: null
    },

    last_name: {
        type: String, 
        required: true,
        default: null
    },

    email: { 
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v: string) {
              return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(v);
            },
            message: (props: { value: string; }) => `${props.value} is not a valid email address!`
          },
        
    },

    password: { 
        type: String, 
        required: true,
        minLength: [8, "Password length is short"]
    },
});


export default mongoose.model('User', userSchema);

 
