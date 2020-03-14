/**
 * Created by rockyl on 2020-02-01.
 */

import {boxlayout, boxlayout_event} from '../libs/boxlayout/boxlayout.js'

/**
 * 面板基类
 */
export class PaneDom extends boxlayout.TabPanel {
	constructor(id, title, content, icon = '') {
		super();

		this.widthCache = 0;
		this.heightCache = 0;

		this.setId(id);
		this.setTitle(title);
		this.setIcon(icon);
		this.content = content;
	}
	/**
	 * 对应的dom节点
	 */
	getRoot() {
		return this.root;
	}
	_focusIn(){
		super._focusIn();
		this.resize(this.widthCache,this.heightCache);
	}

	resize(newWidth, newHeight) {
		super.resize(newWidth, newHeight);
		this.widthCache = newWidth;
		this.heightCache = newHeight;
		if (this.contentImpl && 'doResize' in this.contentImpl) {
			this.contentImpl.doResize(newWidth, newHeight);
		}
	}
	/**
	 * 得到渲染的头附加内容
	 */
	getHeaderRender() {
		return this.header;
	}
	/**
	 * 渲染内容
	 * @param container
	 */
	renderContent(container) {
		container.tabIndex = 0;
		if (this.content) {
			container.appendChild(this.content);

			this.setVisible(true);
		}
	}
	/**
	 * 这个面板是否可见中
	 */
	isVisible() {
		return this._visible;
	}
	/**
	 * 面板关闭
	 */
	shutdown() {

	}
	/**
	 * 设置显示与隐藏
	 * @param visible
	 */
	setVisible(visible) {

	}
	/**
	 * 释放
	 */
	dispose() {
		//dispose(this.contentImpl);
		this.content = null;
	}
}
