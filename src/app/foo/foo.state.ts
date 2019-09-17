export interface State {
    bar: string;
    fooBar: boolean;
    foo: number;
}

export const initialState: State = {
    bar: 'bar',
    fooBar: false,
    foo: 0
};

export const featureKey = 'foo';
