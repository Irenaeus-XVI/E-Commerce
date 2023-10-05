import mongoose from "mongoose"

export const connection = () => {
    mongoose.connect(process.env.CONNECTIONURLONLINE).then(() => console.log('Db Connected')
    ).catch(err => console.log("Error", err)
    );
}