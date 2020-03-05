import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Editor from "../container/Editor";

describe("Editor.js", () => {
  test("<Editor> should render", () => {
    const { getByText } = render(<Editor />);
    const EditorComponent = getByText("Editor");
    expect(EditorComponent).toBeInTheDocument();
  });
  test("Article Title <Input> Box should render", () => {
    const { getByLabelText } = render(<Editor />);
    const articleTitleInputBox = getByLabelText("Article Title Input Box");
    expect(articleTitleInputBox).toBeInTheDocument();
  });
  test("Main Article <Container> should render", () => {
    const { getByLabelText } = render(<Editor />);
    const mainArticleContainer = getByLabelText("Main Article Container");
    expect(mainArticleContainer).toBeInTheDocument();
  });
  test("Article Title <Input> Box shows user typed value", () => {
    const { getByLabelText, getByDisplayValue } = render(<Editor />);
    const articleTitleInputBox = getByLabelText("Article Title Input Box");
    fireEvent.change(articleTitleInputBox, { target: { value: "snapi" } });
    const articleTitleText = getByDisplayValue("snapi");
    expect(articleTitleText).toBeInTheDocument();
  });
  test("TextBox is rendered when add text box button is clicked", () => {
    const { getByLabelText, getAllByLabelText } = render(<Editor />);
    const insertTextButton = getByLabelText("Add Text Button");
    fireEvent.click(insertTextButton);
    const textBlock = getAllByLabelText("Article Content Block");
    expect(textBlock).toHaveLength(2);
  });
  test("TextBox input is rendered on the editor", () => {
    const { getByLabelText, getAllByLabelText, getByDisplayValue } = render(
      <Editor />
    );
    const insertTextButton = getByLabelText("Add Text Button");
    fireEvent.click(insertTextButton);
    const textBlock = getAllByLabelText("Article Content Block");
    fireEvent.change(textBlock[1], { target: { value: "SnapiLOL" } });
    const TextBoxText = getByDisplayValue("SnapiLOL");
    expect(TextBoxText.value).toEqual("SnapiLOL");
  });

  test("Article Title <Input> Box is rendered with no text when creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const articleTitleInputBox = getByLabelText("Article Title Input Box");
    expect(articleTitleInputBox).toBeInTheDocument();
    expect(articleTitleInputBox.value).toEqual("");
  });
  test("Article Content Block is rendered with no text when creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const articleContentBlock = getByLabelText("Article Content Block");
    expect(articleContentBlock).toBeInTheDocument();
    expect(articleContentBlock.value).toEqual("");
  });
  test("Article Content Block is rendered with no text and uuid v4 string in placeholder creating new article", () => {
    const { getByLabelText } = render(<Editor />);
    const articleContentBlock = getByLabelText("Article Content Block");
    expect(articleContentBlock).toBeInTheDocument();
    expect(articleContentBlock.placeholder).toMatch(/-/);
    expect(articleContentBlock.placeholder).toHaveLength(36);
  });
  test("Article Content Block renders user-typed values", () => {
    const { getByLabelText, getByDisplayValue } = render(<Editor />);
    const articleContentBlock = getByLabelText("Article Content Block");
    fireEvent.change(articleContentBlock, { target: { value: "lol" } });
    const articleContentBlockText = getByDisplayValue("lol");
    expect(articleContentBlockText.value).toEqual("lol");
  });
});