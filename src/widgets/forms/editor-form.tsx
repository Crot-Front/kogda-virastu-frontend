import React, {
  useEffect, FC, ChangeEventHandler, FormEventHandler, useState, useRef,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import EventInfo from '@ckeditor/ckeditor5-utils/src/eventinfo';
import { useSelector, useDispatch } from '../../services/hooks';

import {
  setTitle,
  setDescription,
  setBody,
  setTags,
  setImage,
  openConfirm,
  articleDeleteClear,
  articlePatchClear,
  articlePostClear,
} from '../../store';
import {
  getArticleThunk,
  patchArticleThunk,
  postArticleThunk,
  postImageUploadThunk,
} from '../../thunks';
import {
  ButtonContainer,
  ButtonsWrapper,
  Form,
  FormContainer,
  FormTitle,
  InputFieldset,
} from './forms-styles';

import {
  DeletePostButton,
  FieldNameArticle,
  FieldTags,
  FieldUrl,
  PublishPostButton,
  SavePostButton,
  FieldAboutArticle,
} from '../../ui-lib';

const Editor = styled.div`
  div {
    max-width: 100%;
    overflow: hidden;
  }

  p {
    margin: 0;
    font-family: ${({ theme: { text18: { family } } }) => family};
    font-size: ${({ theme: { text18: { size } } }) => size}px ;
    line-height: ${({ theme: { text18: { height } } }) => height}px;
    font-weight: ${({ theme: { text18: { weight } } }) => weight};
    @media screen and (max-width:768px) {
      font-family: ${({ theme: { text16: { family } } }) => family};
      font-size: ${({ theme: { text16: { size } } }) => size}px ;
      line-height: ${({ theme: { text16: { height } } }) => height}px;
      font-weight: ${({ theme: { text16: { weight } } }) => weight}
    }
  }

  li {
      font-family: ${({ theme: { text18: { family } } }) => family};
      font-size: ${({ theme: { text18: { size } } }) => size}px ;
      line-height: ${({ theme: { text18: { height } } }) => height}px;
      font-weight: ${({ theme: { text18: { weight } } }) => weight};
      @media screen and (max-width:768px) {
        font-family: ${({ theme: { text16: { family } } }) => family};
        font-size: ${({ theme: { text16: { size } } }) => size}px ;
        line-height: ${({ theme: { text16: { height } } }) => height}px;
        font-weight: ${({ theme: { text16: { weight } } }) => weight}
      }
    }
`;

const EditorForm: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    title, description, body, tags, link,
  } = useSelector((state) => state.forms.article) ?? {};
  const {
    isArticleFetching,
    isArticlePostingSucceeded,
    isArticlePatchingSucceeded,
    isArticleRemoved,
    isArticlePatching,
    isArticlePosting,
  } = useSelector((state) => state.api);
  const { slug } = useParams();
  const initialArticle = useSelector((state) => state.view.article);
  const [isPosted, setPostRequested] = useState(false);
  const [isRemoving, setRemoveState] = useState(false);
  const inputIcon = document.getElementById('file-input');
  const imageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialArticle?.tagList) {
      dispatch(setTags(initialArticle.tagList.toString()));
    }
  }, [initialArticle, dispatch]);

  useEffect(
    () => {
      if (isPosted && isArticlePatchingSucceeded) {
        dispatch(articlePatchClear());
        navigate('/');
      } else if (isPosted && isArticlePostingSucceeded) {
        dispatch(articlePostClear());
        navigate('/');
      } else if (isArticleRemoved && isRemoving) {
        dispatch(articleDeleteClear());
        navigate('/');
      }
    },
    [
      dispatch,
      navigate,
      isPosted,
      isArticlePostingSucceeded,
      isArticlePatchingSucceeded,
      isArticleRemoved,
      isRemoving],
  );

  useEffect(() => {
    if (slug && !title) {
      dispatch(getArticleThunk(slug));
    }
  }, [slug, dispatch, title]);

  if (slug && isArticleFetching) {
    return <div>Подождите...</div>;
  }

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setTitle(evt.target.value));
  };

  const onChangeDescription: ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    dispatch(setDescription(evt.target.value));
    // eslint-disable-next-line no-param-reassign
    evt.target.style.height = `${evt.target.scrollHeight + 2}px`;
  };

  const onChangeBody = (evt: EventInfo, editor: ClassicEditor) => {
    const data: string = editor.getData();
    dispatch(setBody(data));
  };

  const onChangeTags: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setTags(evt.target.value));
  };

  const onIconClick = () => {
    imageRef.current?.click();
    // inputIcon?.click();
  };

  const changeUploadImage: ChangeEventHandler<HTMLInputElement> = (evt) => {
    const file = evt.target.files?.[0];
    dispatch(postImageUploadThunk(file));
  };

  const onChangeImage: ChangeEventHandler<HTMLInputElement> = (evt) => {
    dispatch(setImage(evt.target.value));
  };

  const submitForm: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    setPostRequested(true);
    if (slug) {
      dispatch(patchArticleThunk(slug));
    } else {
      dispatch(postArticleThunk());
    }
  };

  const deleteArticle = () => {
    setRemoveState(true);
    dispatch(openConfirm());
  };
  const makeButtons = () => (
    slug ? (
      <ButtonsWrapper>
        <SavePostButton disabled={isArticleFetching} />
        <DeletePostButton onClick={deleteArticle} />
      </ButtonsWrapper>
    ) : (
      <PublishPostButton disabled={isArticleFetching || isArticlePatching || isArticlePosting} />
    )
  );

  const makeMessageId = () => {
    if (slug) {
      return 'editArticle';
    }
    return 'newArticle';
  };

  return (
    <FormContainer>
      <FormTitle>
        <FormattedMessage id={makeMessageId()} />
      </FormTitle>
      <Form onSubmit={submitForm}>
        <InputFieldset rowGap={24}>
          <FieldNameArticle
            value={title === '' ? '' : title || initialArticle?.title || ''}
            onChange={onChangeTitle} />
          <FieldAboutArticle
            value={
              description === '' ? ''
                : description || initialArticle?.description || ''
            }
            onChange={onChangeDescription} />
          <FieldUrl
            value={link === '' ? '' : link || initialArticle?.link || ''}
            onChange={onChangeImage}
            onIconClick={onIconClick}
            onChangeUpload={changeUploadImage}
            imageRef={imageRef} />
          <Editor>
            <CKEditor
              config={{
                toolbar: {
                  items: ['bold', 'italic', 'link', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'undo', 'redo'],
                  shouldNotGroupWhenFull: true,
                },
              }}
              editor={ClassicEditor}
              onChange={onChangeBody}
              data={body === '' ? '' : body || initialArticle?.body || ''} />
          </Editor>

          <FieldTags
            value={tags === '' ? '' : tags || ''}
            onChange={onChangeTags} />
        </InputFieldset>
        <ButtonContainer>
          {makeButtons()}
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default EditorForm;
