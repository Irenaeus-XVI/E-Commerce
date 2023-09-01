import { AppError } from "../../utils/AppError.js";
import { handleAsyncError } from "../../utils/handleAsyncError.js";

export const deleteOne = (model, name) => {
    return handleAsyncError(async (req, res, next) => {
        let { id } = req.params;
        const document = await model.findByIdAndDelete(id);
        let response = {}
        response[name] = document
        !document && next(new AppError(` ${name} Not Found.`, 404));
        document && res.status(201).json({ message: "success", ...response });

    });
}