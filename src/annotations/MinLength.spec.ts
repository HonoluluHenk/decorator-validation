import {DecoratorValidator} from "../validator/DecoratorValidator";
import {MinLength} from "./MinLength";

describe('MinLength', () => {
	class Foo {
		@MinLength(5)
		public bar?: string | null;

		constructor(bar: string | null | undefined) {
			this.bar = bar;
		}
	}

	describe('wrong type', () => {
		const fixture = new Foo(5 as any as string);

		it('should throw', () => {
			expect(() => new DecoratorValidator().validate(fixture))
					.toThrowError("invalid type: number, required type: string");
		});
	});

	describe('valid input', () => {
		const params = [
			{text: undefined},
			{text: null},
			{text: "12345"},
			{text: "Hello World"}
		];

		params.forEach(param => {
			it(`should succeed (${param.text})`, () => {
				expect(new DecoratorValidator().validate(new Foo(param.text)).isSuccess)
						.toBe(true);
			})
		});

	});

	describe('invalid input', () => {
		const params = [
			{text: ""},
			{text: "1234"},
		];

		params.forEach(param => {
			it(`should fail (${param.text})`, () => {
				expect(new DecoratorValidator().validate(new Foo(param.text)).isSuccess)
						.toBe(false);
			})
		});
	});

});
