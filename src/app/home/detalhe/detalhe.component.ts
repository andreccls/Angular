import { Comentario } from './../../shared/models/comentario';
import { CommentService } from './../../shared/servicos/comment.service';
import { Usuario } from './../../shared/models/usuario';
import { UserService } from './../../shared/servicos/user.service';
import { Post } from './../../shared/models/post';
import { Meta } from './../../shared/models/meta';
import { PostService } from './../../shared/servicos/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-detalhe',
	templateUrl: './detalhe.component.html',
	styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit {

	post: Post = {} as Post;
	usuario: Usuario = {} as Usuario;
	comentarios: Meta<Comentario> = {} as Meta<Comentario>;
	contactForm: FormGroup;
	oComentario: Comentario = {} as Comentario;
	postId: string;

	constructor(private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private postService: PostService,
		private commentService: CommentService) { }

	ngOnInit(): void {
		this.postId = this.route.snapshot.params['id'];
		this.buscarPost(this.postId);
		this.buscaComentariosPost(this.postId);
		this.criaFormComentarios();
		
	}

	criaFormComentarios() {
		this.contactForm = this.formBuilder.group({
			name: [
				'',
				Validators.compose([
					Validators.required,
					Validators.minLength(3),
					Validators.maxLength(100)
				])
			],
			email: ['', Validators.compose([Validators.email, Validators.required])],
			body: ['', Validators.compose([Validators.minLength(10), Validators.required])]
		});
	}

	buscarPost(idPost: string): void {
		this.postService.getPostDetail(idPost).subscribe((post: Post) => {
			this.post = post;
			this.buscaNomeAutor(this.post.user_id);
		});
	}

	buscaNomeAutor(idAutor: string): void {
		this.userService.getUser(idAutor).subscribe((user: Usuario) => {
			this.usuario = user;
		});
	}

	buscaComentariosPost(idPost: string): void {
		this.commentService.getCommentsByPost(idPost).subscribe((comments: Meta<Comentario>) => {
			this.comentarios = comments;
		});
	}

	onSubmit(): void {
		if (this.contactForm.valid) {
			this.oComentario = this.contactForm.value;
			this.oComentario.post_id = this.postId;
			this.commentService.saveComment(this.oComentario).subscribe((comments: Comentario) => {
				this.buscaComentariosPost(this.postId);
			});
			this.contactForm.reset();
			console.log(this.commentService.handleError);
		} else {
			console.log('form invalido');
		}
	}

	get name() {
		return this.contactForm.get('name');
	}

	get email() {
		return this.contactForm.get('email');
	}

	get body() {
		return this.contactForm.get('body');
	}

}
