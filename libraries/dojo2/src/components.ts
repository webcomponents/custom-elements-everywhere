/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v } from '@dojo/widget-core/d';
import 'ce-without-children';
import 'ce-with-children';
import 'ce-with-properties';
import 'ce-with-event';

export class ComponentWithoutChildren extends WidgetBase {
	render() {
		return v('div', [
			v('ce-without-children', {})
		]);
	}
}

export class ComponentWithChildren extends WidgetBase {
	render() {
		return v('div', [
			v('ce-with-children', {})
		]);
	}
}

export class ComponentWithChildrenRerender extends WidgetBase {
	private _count = 1;
	constructor () {
		super();
		Promise.resolve().then(() => {
			this._count++;
		});
	}
	render() {
		return v('div', [
			v('ce-with-children', [ `${this._count}` ])
		]);
	}
}

export class ComponentWithDifferentViews extends WidgetBase {
	private _showWC = true

	toggle() {
		this._showWC = !this._showWC;
		this.invalidate();
	}
	render() {
		const child = this._showWC ? v('ce-with-children', {}) : v('div', [ 'Dummy view' ]);
		return v('div', [ child ]);
	}
}

export class ComponentWithProperties extends WidgetBase {
	render() {
		const data = {
			bool: true,
			num: 42,
			str: 'Dojo2',
			arr: ['d', 'o', 'j', 'o', '2'],
			obj: { org: 'dojo', repo: 'dojo2' }
		};
		return v('ce-with-properties', data);
	}
}

export class ComponentWithUnregistered extends WidgetBase {
	render() {
		const data = {
			bool: true,
			num: 42,
			str: 'Dojo2',
			arr: ['d', 'o', 'j', 'o', '2'],
			obj: { org: 'dojo', repo: 'dojo2' }
		};
		return v('div', [
			v('ce-unregistered', data)
		]);
	}
}

export class ComponentWithImperativeEvent extends WidgetBase {
	public eventHandled = false
	handleTestEvent(e: any) {
		this.eventHandled = true;
		this.invalidate();
	}
	render() {
		return v('div', [
			v('ce-with-event', { id: 'wc', oncamelEvent: this.handleTestEvent })
		]);
	}
}

export class ComponentWithDeclarativeEvent extends WidgetBase {
	public lowerCaseHandled = false;
	public kebabHandled = false;
	public camelHandled = false;
	public capsHandled = false;
	public pascalHandled = false;
	handleLowercaseEvent(e: any) {
		this.lowerCaseHandled = true;
	}
	handleKebabEvent(e: any) {
		this.kebabHandled = true;
	}
	handleCamelEvent(e: any) {
		this.camelHandled = true;
	}
	handleCapsEvent(e: any) {
		this.capsHandled = true;
	}
	handlePascalEvent(e: any) {
		this.pascalHandled = true;
	}
	render() {
		return v('div', [
			v('ce-with-event', {
				id: 'wc',
				onlowercaseevent: this.handleLowercaseEvent,
				'onkebab-event': this.handleKebabEvent,
				oncamelEvent: this.handleCamelEvent,
				onCAPSevent: this.handleCapsEvent,
				onPascalEvent: this.handlePascalEvent
			})
		]);
	}
}
