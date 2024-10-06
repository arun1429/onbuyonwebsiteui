import { DOCUMENT } from '@angular/common';
import { Injectable,Inject } from '@angular/core';
@Injectable({
	providedIn: 'root'
})
export class JsonLDService {
	static scriptType = 'application/json+ld';
	static websiteSchema = (url?: string, name?: string) => {
		return {
			'@context': 'http://schema.org',
			'@type'      : 'WebSite',
			url          : url || 'https:\/\/google.com',
			name         : name || 'Google',
			"sameAs": ["https://facebook.com/google",
				   "https://instagram.com/google",
				   "https://twitter.com/google"]
			};
	};

	static orgSchema = () => ({
			'@context'  :
				'https://schema.org',
			'@type'     :
				'Product',
			url         :
				'https://google.com',
			name        :
				'Google',
			contactPoint: {
				'@type'    :
					'ContactPoint',
				telephone  :
					'8826061888',
				contactType:
					'Customer service'
			}
		});

	constructor(@Inject(DOCUMENT) private _document: Document) {}

	removeStructuredData(): void {
		const els: any[] = [];
		[ 'structured-data', 'structured-data-org' ].forEach(c => {
			els.push(...Array.from(this._document.head.getElementsByClassName(c)));
		});
		els.forEach(el => this._document.head.removeChild(el));
	}

	insertSchema(schema: Record<string, any>, className = 'structured-data'): void {
		let script;
		let shouldAppend = false;
		if (this._document.head.getElementsByClassName(className).length) {
			script = this._document.head.getElementsByClassName(className)[0];
		} else {
			script = this._document.createElement('script');
			shouldAppend = true;
		}
		script.type = JsonLDService.scriptType;
		script.text = JSON.stringify(schema);
		if (shouldAppend) {
			this._document.head.appendChild(script);
		}
	}
}