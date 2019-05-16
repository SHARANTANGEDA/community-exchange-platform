import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { askQuestion, getCourseCodes } from '../../actions/homeQuestionsActions'
import classnames from 'classnames'
import GetCourses from '../commonDashboard/GetCourses'
// import addLinkPlugin from '../common/plugins/addLinkPlugin';
// import BlockStyleToolbar, { getBlockStyle } from "../common/blockStyles/BlockStyleToolbar";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import CreatableSelect from 'react-select/lib/Creatable'
import Select from 'react-select'
import CreatableSelect from 'react-select/lib/Creatable';



class AskQuestions extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      description:'',
      tags: '',
      course: null,
      errors: {}

    }
    //
    // this.plugins = [
    //   addLinkPlugin
    // ];

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onTagsChange = this.onTagsChange.bind(this)
    this.onCourseChange = this.onCourseChange.bind(this)
  }

  componentDidMount() {
    this.props.getCourseCodes(this.props.match.params.id);
    console.log("Called DidMount in All CourseCodes");

  }
  componentWillReceiveProps (nextProps, nextContext) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }

  }
  //
  // handleKeyCommand = (command) => {
  //   const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
  //   if (newState) {
  //     this.onDescriptionChange(newState);
  //     return 'handled';
  //   }
  //   return 'not-handled';
  // }
  // onUnderlineClick = () => {
  //   this.onDescriptionChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  // }
  // toggleBlockType = (blockType) => {
  //   this.onDescriptionChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  // };
  // onBoldClick = () => {
  //   this.onDescriptionChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  // }
  //
  // onItalicClick = () => {
  //   this.onDescriptionChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  // }


  onSubmit (e) {
    e.preventDefault();
    const { user } = this.props.auth
    const newQuestion = {
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      course:this.state.course.value
    }
    this.props.askQuestion(newQuestion);
    if(this.state.title==='' || this.state.description==='' || this.state.tags===null) {

    }else {
      this.props.history.push('/dashboard');
    }
  }

  onChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onTagsChange(e) {
    console.log(e)
    this.setState({tags: e})
    console.log(this.state.tags)
  }
  onCourseChange (e) {
    console.log({course:e})
    this.setState({course: e})
    console.log(this.state.tags)
  }
  // onDescriptionChange(e) {
  //   this.setState({description:e})
  // }
  // onStrikeThroughClick = () => {
  //   this.onChange(
  //     RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH")
  //   );
  // };
  // onAddLink = () => {
  //   const editorState = this.state.editorState;
  //   const selection = editorState.getSelection();
  //   const link = window.prompt('Paste the link -')
  //   if (!link) {
  //     this.onChange(RichUtils.toggleLink(editorState, selection, null));
  //     return 'handled';
  //   }
  //   const content = editorState.getCurrentContent();
  //   const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
  //   const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
  //   const entityKey = contentWithEntity.getLastCreatedEntityKey();
  //   this.onDescriptionChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  // }
  onClickDiscard(e) {
    this.setState({ title: '' })
    this.setState({ description: '' })
    this.setState({ tags: null })
    this.setState({ course: 'Choose Course' })

  }


  render () {
    const { errors } = this.state;
    const { courses, loading } = this.props.courses;
    const {tags,course} = this.state
    let content=[],tagContent=[];

    if (courses === null || loading) {
      content = [];
      tagContent = [];
    } else {
      let codes=courses.allCourses;
      console.log({codes:codes})
      codes.map(course => (
        content.push({value: course,label: course})
      ));

    }
    console.log("In Ask Question")
    return (
      <div className='askQuestion'>
        <div id="content" className="snippet-hidden">
        <div className="ask-mainbar box-border">
          <form  className="post-form" onSubmit={this.onSubmit}>
            <div id="question-form">
              <div className="question-context-title">
                <h2>Ask a question</h2>
              </div>
              <div className="js-wz-element" id="post-title" style={{position: 'relative'}} data-wz-state="2,4,256">
                <div className="form-item ask-title">
                  <div className="js-wz-element" data-wz-state="2,256">
                    <div className="grid gs8 gsx">
                      <div className="grid--cell fl1 grid fd-column js-stacks-validation">
                        <label>
                          <h4>Title</h4>
                        </label>
                        <div className="fl1 ps-relative form-group">
                          <input name="title" type="text" maxLength="300" tabIndex="100"
                                 placeholder="Be Clear and don't write topic name"
                                 className={classnames("s-input js-ask-title h100 mt0 ask-title-field w-75 form-control",
                                   {'is-invalid':errors.title})}
                                  onChange={this.onChange} value={this.state.title}/>
                          {errors.title &&
                          (<div className="invalid-feedback" >{errors.title}</div>)
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="post-editor" className="post-editor js-post-editor js-wz-element">
              <div className="ps-relative w-75" style={{minHeight: '175px'}}>
                <label className="s-label mb4 d-block w-100" htmlFor="wmd-input">
                  <h4>Body</h4>
                </label>

                <CKEditor
                  editor={ ClassicEditor }
                  data={this.state.description}
                  onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    this.setState({description: data})
                    console.log( { event, editor, data } );
                  } }
                  config={{
                    fontColor: 'black'
                  }}
                />

                {/*<div className="wmd-container mb8 w-100 form-group">*/}
                {/*    <textarea className={classnames("wmd-input js-wz-element s-input bar0 w-100 form-control"*/}
                {/*      ,{'is-invalid':errors.description})} name="description"*/}
                {/*              cols="90" rows="15" tabIndex="101" onChange={this.onChange}*/}
                {/*              value={this.state.description} />*/}
                {/*    {errors.description &&*/}
                {/*    (<div className="invalid-feedback" >{errors.description}</div>)*/}
                {/*    }*/}
                {/*</div>*/}
              </div>
            </div>
            <div className="form-group w-75" style={{marginTop: '10px'}}>
              <label className="s-label mb4 d-block w-100" htmlFor="wmd-input">
                <h4>Course</h4>
              </label>
              <Select options={content} className={classnames("isSearchable",{'is-invalid': errors.course})}
                      placeholder="You can add it to a course..."
                               name="course" value={course} onChange={this.onCourseChange}>
              </Select>
              {errors.course && (
                <div className="invalid-feedback">{errors.course}</div>
              )}
            </div>
            <span className="focus-input100"/>
            <div className="ps-relative">
                <label htmlFor="tagNames" className="s-label mb4 d-block">
                  <h4>Tags</h4>
                </label>
                <div className="ps-relative form-group">
                  <input className={classnames("s-input box-border form-control",{'is-invalid':errors.tags})} name="tags" type="text"
                         tabIndex="103" placeholder="Type Tags with separated commas" onChange={this.onChange}
                         value={this.state.tags}/>
                  {/*<CreatableSelect isMulti options={tagContent} className={classnames("isSearchable w-75",*/}
                  {/*  {'is-invalid': errors.course})} placeholder="select or create multiple tags"*/}
                  {/*         name="tags" value={tags} onChange={this.onTagsChange}>*/}
                  {/*</CreatableSelect>*/}
                  {errors.tags &&
                  (<div className="invalid-feedback" >{errors.tags}</div>)
                  }
                </div>
            </div>
            <div className="js-wz-element" id="question-only-section">
              <div className="form-submit cbt grid gsx gs4 p0 mt32">
                <button className="btn btn-primary w-20 my-1" type="submit" tabIndex="120"
                        style={{width: "30%",margin: "10px"}}> Post Your Question
                </button>
                <button className="btn btn-primary w-30 my-1" onClick={this.onClickDiscard.bind(this)}>Discard</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    )
  }
}
//
// {/*<button onClick={this.onUnderlineClick}>U</button>*/}
// {/*<button onClick={this.onBoldClick}><b>B</b></button>*/}
// {/*<button onClick={this.onItalicClick}><em>I</em></button>*/}
// {/*<button*/}
// {/*  className="inline styleButton strikethrough"*/}
// {/*  onClick={this.onStrikeThroughClick}*/}
// {/*>*/}
// {/*  abc*/}
// {/*</button>*/}
// {/*<button id="link_url" onClick={this.onAddLink} className="add-link">*/}
// {/*  <i className="material-icons">attach_file</i>*/}
// {/*</button>*/}
// {/*<div style={{borderWidth: '5px', minHeight:'90px',borderColor: 'black'}}>/*/}
// {/*  <BlockStyleToolbar*/}
// {/*    editorState={this.state.editorState}*/}
// {/*    onToggle={this.toggleBlockType}*/}
// {/*  />*/}
// {/*  <Editor editorState={this.state.description} onChange={this.onDescriptionChange}*/}
// {/*          blockStyleFn={getBlockStyle}*/}
// {/*          handleKeyCommand={this.handleKeyCommand}*/}
// {/*          plugins={this.plugins} className='wmd-input js-wz-element s-input bar0 w-100 form-control'*/}
// {/*          style={{borderWidth: '5px', minHeight:'90px',borderColor: 'black'}}/>\*/}
// {/*</div>*/}

// //TEMPLATE OF RICH TEXT
// <CKEditor
//   editor={ ClassicEditor }
//   data={this.state.description}
//   onInit={ editor => {
//     // You can store the "editor" and use when it is needed.
//     console.log( 'Editor is ready to use!', editor );
//   } }
//   onChange={ ( event, editor ) => {
//     const data = editor.getData();
//     this.setState({description: data})
//     console.log( { event, editor, data } );
//   } }
//   onBlur={ editor => {
//     console.log( 'Blur.', editor );
//   } }
//   onFocus={ editor => {
//     console.log( 'Focus.', editor );
//   } }
// />
AskQuestions.propTypes = {
  askQuestion: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getCourseCodes: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  courses: PropTypes.object.isRequired,
  home: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  courses: state.courses,
  home: state.home,

})

export default connect(mapStateToProps, { getCourseCodes,askQuestion })(AskQuestions)
