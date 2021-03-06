/* generated by Svelte vX.Y.Z */
import { SvelteComponent as SvelteComponent_1, createComment, createElement, detachNode, flush, init, insert, run, safe_not_equal } from "svelte/internal";

// (3:0) {:else}
function create_else_block(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "not foo!";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

// (1:0) {#if foo}
function create_if_block(component, ctx) {
	var p;

	return {
		c() {
			p = createElement("p");
			p.textContent = "foo!";
		},

		m(target, anchor) {
			insert(target, p, anchor);
		},

		d(detach) {
			if (detach) {
				detachNode(p);
			}
		}
	};
}

function create_fragment(component, ctx) {
	var if_block_anchor, current;

	function select_block_type(ctx) {
		if (ctx.foo) return create_if_block;
		return create_else_block;
	}

	var current_block_type = select_block_type(ctx);
	var if_block = current_block_type(component, ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = createComment();
		},

		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},

		p(changed, ctx) {
			if (current_block_type !== (current_block_type = select_block_type(ctx))) {
				if_block.d(1);
				if_block = current_block_type(component, ctx);
				if_block.c();
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},

		i(target, anchor) {
			if (current) return;
			this.m(target, anchor);
		},

		o: run,

		d(detach) {
			if_block.d(detach);
			if (detach) {
				detachNode(if_block_anchor);
			}
		}
	};
}

function instance($$self, $$props) {
	let { foo } = $$props;

	$$self.$$.set = $$props => {
		if ('foo' in $$props) foo = $$props.foo;
	};

	return { foo };
}

class SvelteComponent extends SvelteComponent_1 {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal);
	}

	get foo() {
		return this.$$.ctx.foo;
	}

	set foo(foo) {
		this.$set({ foo });
		flush();
	}
}

export default SvelteComponent;