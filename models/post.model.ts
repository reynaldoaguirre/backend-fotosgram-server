import {Schema, Document, model} from 'mongoose';

const postSchema = new Schema({

    created:{
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs:[{
        type: String
    }],
    coords:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }

});

//trigger
postSchema.pre<IPost>('save', function(next){
    this.created = new Date();
    next();
});

interface IPost extends Document{
    created: Date;
    mensaje: string;
    imgs: string[];
    coords: string;
    usuario: string
}

export const Post = model<IPost>('Post', postSchema);
