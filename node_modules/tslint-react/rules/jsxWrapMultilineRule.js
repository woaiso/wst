/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("tslint");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new JsxWrapMultilineWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
Rule.FAILURE_NOT_WRAPPED = "Multiline JSX elements must be wrapped in parentheses";
Rule.FAILURE_MISSING_NEW_LINE_AFTER_OPEN = "New line required after open parenthesis when wrapping multiline JSX elements";
Rule.FAILURE_MISSING_NEW_LINE_BEFORE_CLOSE = "New line requred before close parenthesis when wrapping multiline JSX elements";
exports.Rule = Rule;
var JsxWrapMultilineWalker = (function (_super) {
    __extends(JsxWrapMultilineWalker, _super);
    function JsxWrapMultilineWalker() {
        return _super.apply(this, arguments) || this;
    }
    JsxWrapMultilineWalker.prototype.visitJsxElement = function (node) {
        this.checkNode(node);
        _super.prototype.visitJsxElement.call(this, node);
    };
    JsxWrapMultilineWalker.prototype.visitJsxSelfClosingElement = function (node) {
        this.checkNode(node);
        _super.prototype.visitJsxSelfClosingElement.call(this, node);
    };
    JsxWrapMultilineWalker.prototype.checkNode = function (node) {
        var sourceFile = this.getSourceFile();
        var startLine = this.getLine(node.getStart(sourceFile));
        var endLine = this.getLine(node.getEnd());
        if (startLine === endLine) {
            return;
        }
        if (node.parent == null) {
            this.addNotWrappedFailure(node);
            return;
        }
        if (node.parent.kind === ts.SyntaxKind.JsxElement) {
            return;
        }
        var siblings = node.parent.getChildren(sourceFile);
        var index = siblings.indexOf(node);
        var previousToken = siblings[index - 1];
        var nextToken = siblings[index + 1];
        if (previousToken == null
            || previousToken.kind !== ts.SyntaxKind.OpenParenToken
            || nextToken == null
            || nextToken.kind !== ts.SyntaxKind.CloseParenToken) {
            this.addNotWrappedFailure(node);
            return;
        }
        var startParenLine = this.getLine(previousToken.getStart(sourceFile));
        if (startParenLine === startLine) {
            this.addFailureAtPositions(previousToken.getStart(sourceFile), node.getStart(sourceFile) - 1, Rule.FAILURE_MISSING_NEW_LINE_AFTER_OPEN);
        }
        var endParenLine = this.getLine(nextToken.getStart(sourceFile));
        if (endParenLine === endLine) {
            this.addFailureAtPositions(node.getEnd(), nextToken.getStart(sourceFile), Rule.FAILURE_MISSING_NEW_LINE_BEFORE_CLOSE);
        }
    };
    JsxWrapMultilineWalker.prototype.addNotWrappedFailure = function (node) {
        var sourceFile = this.getSourceFile();
        var failure = this.createFailure(node.getStart(sourceFile), node.getWidth(sourceFile), Rule.FAILURE_NOT_WRAPPED);
        this.addFailure(failure);
    };
    JsxWrapMultilineWalker.prototype.addFailureAtPositions = function (start, end, message) {
        var failure = this.createFailure(start, end - start + 1, message);
        this.addFailure(failure);
    };
    JsxWrapMultilineWalker.prototype.getLine = function (position) {
        return this.getSourceFile().getLineAndCharacterOfPosition(position).line;
    };
    return JsxWrapMultilineWalker;
}(Lint.RuleWalker));
